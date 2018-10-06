/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CustomerComponentsPage, CustomerDeleteDialog, CustomerUpdatePage } from './customer.page-object';

const expect = chai.expect;

describe('Customer e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let customerUpdatePage: CustomerUpdatePage;
    let customerComponentsPage: CustomerComponentsPage;
    let customerDeleteDialog: CustomerDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Customers', async () => {
        await navBarPage.goToEntity('customer');
        customerComponentsPage = new CustomerComponentsPage();
        expect(await customerComponentsPage.getTitle()).to.eq('storeApp.customer.home.title');
    });

    it('should load create Customer page', async () => {
        await customerComponentsPage.clickOnCreateButton();
        customerUpdatePage = new CustomerUpdatePage();
        expect(await customerUpdatePage.getPageTitle()).to.eq('storeApp.customer.home.createOrEditLabel');
        await customerUpdatePage.cancel();
    });

    it('should create and save Customers', async () => {
        const nbButtonsBeforeCreate = await customerComponentsPage.countDeleteButtons();

        await customerComponentsPage.clickOnCreateButton();
        await customerUpdatePage.setFirstNameInput('firstName');
        expect(await customerUpdatePage.getFirstNameInput()).to.eq('firstName');
        await customerUpdatePage.setLastNameInput('lastName');
        expect(await customerUpdatePage.getLastNameInput()).to.eq('lastName');
        await customerUpdatePage.genderSelectLastOption();
        await customerUpdatePage.setEmailInput('email');
        expect(await customerUpdatePage.getEmailInput()).to.eq('email');
        await customerUpdatePage.setPhoneInput('phone');
        expect(await customerUpdatePage.getPhoneInput()).to.eq('phone');
        await customerUpdatePage.setAddressLine1Input('addressLine1');
        expect(await customerUpdatePage.getAddressLine1Input()).to.eq('addressLine1');
        await customerUpdatePage.setAddressLine2Input('addressLine2');
        expect(await customerUpdatePage.getAddressLine2Input()).to.eq('addressLine2');
        await customerUpdatePage.setCityInput('city');
        expect(await customerUpdatePage.getCityInput()).to.eq('city');
        await customerUpdatePage.setCountryInput('country');
        expect(await customerUpdatePage.getCountryInput()).to.eq('country');
        await customerUpdatePage.userSelectLastOption();
        await customerUpdatePage.save();
        expect(await customerUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await customerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Customer', async () => {
        const nbButtonsBeforeDelete = await customerComponentsPage.countDeleteButtons();
        await customerComponentsPage.clickOnLastDeleteButton();

        customerDeleteDialog = new CustomerDeleteDialog();
        expect(await customerDeleteDialog.getDialogTitle()).to.eq('storeApp.customer.delete.question');
        await customerDeleteDialog.clickOnConfirmButton();

        expect(await customerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
