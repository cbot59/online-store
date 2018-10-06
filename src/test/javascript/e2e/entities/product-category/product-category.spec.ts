/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProductCategoryComponentsPage, ProductCategoryDeleteDialog, ProductCategoryUpdatePage } from './product-category.page-object';

const expect = chai.expect;

describe('ProductCategory e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let productCategoryUpdatePage: ProductCategoryUpdatePage;
    let productCategoryComponentsPage: ProductCategoryComponentsPage;
    let productCategoryDeleteDialog: ProductCategoryDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ProductCategories', async () => {
        await navBarPage.goToEntity('product-category');
        productCategoryComponentsPage = new ProductCategoryComponentsPage();
        expect(await productCategoryComponentsPage.getTitle()).to.eq('storeApp.productCategory.home.title');
    });

    it('should load create ProductCategory page', async () => {
        await productCategoryComponentsPage.clickOnCreateButton();
        productCategoryUpdatePage = new ProductCategoryUpdatePage();
        expect(await productCategoryUpdatePage.getPageTitle()).to.eq('storeApp.productCategory.home.createOrEditLabel');
        await productCategoryUpdatePage.cancel();
    });

    it('should create and save ProductCategories', async () => {
        const nbButtonsBeforeCreate = await productCategoryComponentsPage.countDeleteButtons();

        await productCategoryComponentsPage.clickOnCreateButton();
        await productCategoryUpdatePage.setNameInput('name');
        expect(await productCategoryUpdatePage.getNameInput()).to.eq('name');
        await productCategoryUpdatePage.setDescriptionInput('description');
        expect(await productCategoryUpdatePage.getDescriptionInput()).to.eq('description');
        await productCategoryUpdatePage.save();
        expect(await productCategoryUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await productCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ProductCategory', async () => {
        const nbButtonsBeforeDelete = await productCategoryComponentsPage.countDeleteButtons();
        await productCategoryComponentsPage.clickOnLastDeleteButton();

        productCategoryDeleteDialog = new ProductCategoryDeleteDialog();
        expect(await productCategoryDeleteDialog.getDialogTitle()).to.eq('storeApp.productCategory.delete.question');
        await productCategoryDeleteDialog.clickOnConfirmButton();

        expect(await productCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
