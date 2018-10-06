import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StoreSharedModule } from 'app/shared';
import {
    ProductCategoryComponent,
    ProductCategoryDetailComponent,
    ProductCategoryUpdateComponent,
    ProductCategoryDeletePopupComponent,
    ProductCategoryDeleteDialogComponent,
    productCategoryRoute,
    productCategoryPopupRoute
} from './';

const ENTITY_STATES = [...productCategoryRoute, ...productCategoryPopupRoute];

@NgModule({
    imports: [StoreSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProductCategoryComponent,
        ProductCategoryDetailComponent,
        ProductCategoryUpdateComponent,
        ProductCategoryDeleteDialogComponent,
        ProductCategoryDeletePopupComponent
    ],
    entryComponents: [
        ProductCategoryComponent,
        ProductCategoryUpdateComponent,
        ProductCategoryDeleteDialogComponent,
        ProductCategoryDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StoreProductCategoryModule {}
