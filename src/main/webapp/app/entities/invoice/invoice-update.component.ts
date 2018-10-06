import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IInvoice } from 'app/shared/model/invoice.model';
import { InvoiceService } from './invoice.service';
import { IProductOrder } from 'app/shared/model/product-order.model';
import { ProductOrderService } from 'app/entities/product-order';

@Component({
    selector: 'jhi-invoice-update',
    templateUrl: './invoice-update.component.html'
})
export class InvoiceUpdateComponent implements OnInit {
    private _invoice: IInvoice;
    isSaving: boolean;

    productorders: IProductOrder[];
    date: string;
    paymentDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private invoiceService: InvoiceService,
        private productOrderService: ProductOrderService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ invoice }) => {
            this.invoice = invoice;
        });
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
        this.invoice.date = moment(this.date, DATE_TIME_FORMAT);
        this.invoice.paymentDate = moment(this.paymentDate, DATE_TIME_FORMAT);
        if (this.invoice.id !== undefined) {
            this.subscribeToSaveResponse(this.invoiceService.update(this.invoice));
        } else {
            this.subscribeToSaveResponse(this.invoiceService.create(this.invoice));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IInvoice>>) {
        result.subscribe((res: HttpResponse<IInvoice>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProductOrderById(index: number, item: IProductOrder) {
        return item.id;
    }
    get invoice() {
        return this._invoice;
    }

    set invoice(invoice: IInvoice) {
        this._invoice = invoice;
        this.date = moment(invoice.date).format(DATE_TIME_FORMAT);
        this.paymentDate = moment(invoice.paymentDate).format(DATE_TIME_FORMAT);
    }
}
