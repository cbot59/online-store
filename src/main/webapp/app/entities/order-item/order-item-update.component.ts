import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IOrderItem } from 'app/shared/model/order-item.model';
import { OrderItemService } from './order-item.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product';
import { IProductOrder } from 'app/shared/model/product-order.model';
import { ProductOrderService } from 'app/entities/product-order';

@Component({
    selector: 'jhi-order-item-update',
    templateUrl: './order-item-update.component.html'
})
export class OrderItemUpdateComponent implements OnInit {
    private _orderItem: IOrderItem;
    isSaving: boolean;

    products: IProduct[];

    productorders: IProductOrder[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private orderItemService: OrderItemService,
        private productService: ProductService,
        private productOrderService: ProductOrderService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ orderItem }) => {
            this.orderItem = orderItem;
        });
        this.productService.query().subscribe(
            (res: HttpResponse<IProduct[]>) => {
                this.products = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.productOrderService.query().subscribe(
            (res: HttpResponse<IProductOrder[]>) => {
                this.productorders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.orderItem.id !== undefined) {
            this.subscribeToSaveResponse(this.orderItemService.update(this.orderItem));
        } else {
            this.subscribeToSaveResponse(this.orderItemService.create(this.orderItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOrderItem>>) {
        result.subscribe((res: HttpResponse<IOrderItem>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackProductById(index: number, item: IProduct) {
        return item.id;
    }

    trackProductOrderById(index: number, item: IProductOrder) {
        return item.id;
    }
    get orderItem() {
        return this._orderItem;
    }

    set orderItem(orderItem: IOrderItem) {
        this._orderItem = orderItem;
    }
}
