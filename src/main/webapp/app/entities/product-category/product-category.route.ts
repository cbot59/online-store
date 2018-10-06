import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from 'app/shared/model/product-category.model';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryComponent } from './product-category.component';
import { ProductCategoryDetailComponent } from './product-category-detail.component';
import { ProductCategoryUpdateComponent } from './product-category-update.component';
import { ProductCategoryDeletePopupComponent } from './product-category-delete-dialog.component';
import { IProductCategory } from 'app/shared/model/product-category.model';

@Injectable({ providedIn: 'root' })
export class ProductCategoryResolve implements Resolve<IProductCategory> {
    constructor(private service: ProductCategoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((productCategory: HttpResponse<ProductCategory>) => productCategory.body));
        }
        return of(new ProductCategory());
    }
}

export const productCategoryRoute: Routes = [
    {
        path: 'product-category',
        component: ProductCategoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.productCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'product-category/:id/view',
        component: ProductCategoryDetailComponent,
        resolve: {
            productCategory: ProductCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.productCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'product-category/new',
        component: ProductCategoryUpdateComponent,
        resolve: {
            productCategory: ProductCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.productCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'product-category/:id/edit',
        component: ProductCategoryUpdateComponent,
        resolve: {
            productCategory: ProductCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.productCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productCategoryPopupRoute: Routes = [
    {
        path: 'product-category/:id/delete',
        component: ProductCategoryDeletePopupComponent,
        resolve: {
            productCategory: ProductCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.productCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
