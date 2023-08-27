import Header from '../../components/header/header.tsx';
import { CardsList } from '../../components/cards-list/cards-list.tsx';
import { Sorting } from '../../components/sorting/sorting.tsx';
import { TSorting } from '../../types/sorting.ts';
import { Offer } from '../../types/offer.ts';
import { Helmet } from 'react-helmet-async';
import Map from '../../components/map/map.tsx';
import { useState } from 'react';
import { useAppSelector } from '../../components/hooks/index.ts';
import { CitiesList } from '../../components/cities-list/cities-list.tsx';
import { Loader } from '../../components/loader/loader.tsx';
import { getOffers, getOffersLoadingStatus, getActiveCity } from '../../store/offers-process/offers-process.selectors.ts';
import { getOffersByCity } from '../../utils.ts';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors.ts';
import { AuthorizationStatus } from '../../const.ts';
import { MainPageEmpty } from '../../components/main-page-empty/main-page-empty.tsx';
import cn from 'classnames';

function MainPage(): JSX.Element {
  const [activeCard, setActiveCard] = useState<Offer | undefined>(undefined);
  const [currentSorting, setCurrentSorting] = useState<TSorting>('Popular');
  const isOffersDataLoading = useAppSelector(getOffersLoadingStatus);

  const currentCity = useAppSelector(getActiveCity);
  const offers = useAppSelector(getOffers);
  const offersByCity = getOffersByCity(currentSorting, offers, currentCity.name);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isEmpty = offersByCity.length === 0;

  const handleMouseEnterItem = (id: string | undefined) => {
    const currentCard = offers.find((offer) => offer.id === id);
    setActiveCard(currentCard);
  };

  const handleSortChange = (newSorting: TSorting) => {
    setCurrentSorting(newSorting);
  };

  if (isOffersDataLoading || authorizationStatus === AuthorizationStatus.Unknown) {
    return <Loader />;
  }

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className={cn(
        'page__main',
        'page__main--index',
        {'page__main--index-empty': isEmpty}
      )}
      >
        <Helmet>
          <title>6 городов</title>
        </Helmet>
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList currentCity={currentCity} />
        {!isEmpty ?
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offersByCity.length} places to stay in {currentCity.name}</b>
                <Sorting
                  currentSorting={currentSorting}
                  onChange={handleSortChange}
                />
                <CardsList
                  offers={offersByCity}
                  onCardMouseEnter={handleMouseEnterItem}
                />
              </section>
              <div className="cities__right-section">
                <Map
                  offers={offersByCity}
                  activeCard={activeCard}
                  city={currentCity}
                  isMainPage
                />
              </div>
            </div>
          </div>
          :
          <MainPageEmpty cityName={currentCity.name} />}
      </main>
    </div>
  );
}

export default MainPage;
