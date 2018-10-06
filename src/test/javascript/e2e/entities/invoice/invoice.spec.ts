/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { InvoiceComponentsPage, InvoiceDeleteDialog, InvoiceUpdatePage } from './invoice.page-object';

const expect = chai.expect;

describe('Invoice e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let invoiceUpdatePage: InvoiceUpdatePage;
    let invoiceComponentsPage: InvoiceComponentsPage;
    let invoiceDeleteDialog: InvoiceDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Invoices', async () => {
        await navBarPage.goToEntity('invoice');
        invoiceComponentsPage = new InvoiceComponentsPage();
        expect(await invoiceComponentsPage.getTitle()).to.eq('storeApp.invoice.home.title');
    });

    it('should load create Invoice page', async () => {
        await invoiceComponentsPage.clickOnCreateButton();
        invoiceUpdatePage = new InvoiceUpdatePage();
        expect(await invoiceUpdatePage.getPageTitle()).to.eq('storeApp.invoice.home.createOrEditLabel');
        await invoiceUpdatePage.cancel();
    });

    it('should create and save Invoices', async () => {
        const nbButtonsBeforeCreate = await invoiceComponentsPage.countDeleteButtons();

        await invoiceComponentsPage.clickOnCreateButton();
        await invoiceUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await invoiceUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
        await invoiceUpdatePage.setDetailsInput('details');
        expect(await invoiceUpdatePage.getDetailsInput()).to.eq('details');
        await invoiceUpdatePage.statusSelectLastOption();
        await invoiceUpdatePage.paymentMethodSelectLastOption();
        await invoiceUpdatePage.setPaymentDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await invoiceUpdatePage.getPaymentDateInput()).to.contain('2001-01-01T02:30');
        await invoiceUpdatePage.setPaymentAmountInput('5');
        expect(await invoiceUpdatePage.getPaymentAmountInput()).to.eq('5');
        await invoiceUpdatePage.orderSelectLastOption();
        await invoiceUpdatePage.save();
        expect(await invoiceUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await invoiceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Invoice', async () => {
        const nbButtonsBeforeDelete = await invoiceComponentsPage.countDeleteButtons();
        await invoiceComponentsPage.clickOnLastDeleteButton();

        invoiceDeleteDialog = new InvoiceDeleteDialog();
        expect(await invoiceDeleteDialog.getDialogTitle()).to.eq('storeApp.invoice.delete.question');
        await invoiceDeleteDialog.clickOnConfirmButton();

        expect(await invoiceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
