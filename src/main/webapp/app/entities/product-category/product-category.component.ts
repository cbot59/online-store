import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProductCategory } from 'app/shared/model/product-category.model';
import { Principal } from 'app/core';
import { ProductCategoryService } from './product-category.service';

@Component({
    selector: 'jhi-product-category',
    templateUrl: './product-category.component.html'
})
export class ProductCategoryComponent implements OnInit, OnDestroy {
    productCategories: IProductCategory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private productCategoryService: ProductCategoryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.productCategoryService.query().subscribe(
            (res: HttpResponse<IProductCategory[]>) => {
                this.productCategories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProductCategories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProductCategory) {
        return item.id;
    }

    registerChangeInProductCategories() {
        this.eventSubscriber = this.eventManager.subscribe('productCategoryListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
