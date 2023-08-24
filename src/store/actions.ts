import { createAction } from '@reduxjs/toolkit';
import { NameSpace, AppRoute } from '../const';

const redirectToRoute = createAction<AppRoute>(`${NameSpace.App}/redirectToRoute`);

export {redirectToRoute};
