import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StoreSharedModule } from 'app/shared';
import {
    ProductOrderComponent,
    ProductOrderDetailComponent,
    ProductOrderUpdateComponent,
    ProductOrderDeletePopupComponent,
    ProductOrderDeleteDialogComponent,
    productOrderRoute,
    productOrderPopupRoute
} from './';

const ENTITY_STATES = [...productOrderRoute, ...productOrderPopupRoute];

@NgModule({
    imports: [StoreSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProductOrderComponent,
        ProductOrderDetailComponent,
        ProductOrderUpdateComponent,
        ProductOrderDeleteDialogComponent,
        ProductOrderDeletePopupComponent
    ],
    entryComponents: [
        ProductOrderComponent,
        ProductOrderUpdateComponent,
        ProductOrderDeleteDialogComponent,
        ProductOrderDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StoreProductOrderModule {}
