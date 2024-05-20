import { getAdminBaseUrl, getAdminUserName, getAdminPassword, generateRandomNumber, generateRandomString, generateRandomEmail, generateRandomBicCode,
    generateRandomStringRU, generateRandomStringWithNumbers, generateRandomStringOnlyUpperCase } from '../../../support/functions.js';

const baseUrl = getAdminBaseUrl();
const adminUserName = getAdminUserName();
const adminPassword = getAdminPassword();


describe('Verify Admin can navigate through investor profile tabs', () => {

    // forcing investors to reenter their data
    it('Admin should be able to navigate through investor profile tabs', () => {
        
        cy.AdminSimpleLogin(baseUrl, adminUserName, adminPassword);

        cy.contains('Investors').click(); //clicking on the "Investors" tab
        cy.get('[ng-reflect-router-link="/investor-profiles"]').click(); // clicking on the "All Investors" option
        cy.get('[data-cy="entityDetailsButton"]').eq(0).click(); // clicking on the first investor from the list
        cy.contains('Investor Profiles');

        // Fields Validation
        cy.VerifyingInvestorTabsAsAdmin();
        
    });
});