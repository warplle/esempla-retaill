import { getAdminBaseUrl, getAdminUserName, getAdminPassword, generateRandomNumber, generateRandomString, generateRandomEmail, generateRandomBicCode,
    generateRandomStringRU, generateRandomStringWithNumbers, generateRandomStringOnlyUpperCase } from '../../../support/functions.js';

const baseUrl = getAdminBaseUrl();
const adminUserName = getAdminUserName();
const adminPassword = getAdminPassword();
const reasonField = generateRandomString(25) + generateRandomString(25);


describe('Verify Admin can close investor account', () => {

    it('Admin should be able to close an investor account with status [Active]', () => {

        cy.AdminSimpleLogin(baseUrl, adminUserName, adminPassword);

        cy.contains('Investors').click(); //clicking on the "Investors" tab
        cy.get('[ng-reflect-router-link="/investor-profiles"]').click(); // clicking on the "All Investors" option
        cy.get('[jhisortby="idnp"]').click(); //sorting ascending the investor profiles
        cy.get('[data-cy="entityDetailsButton"]').eq(0).click(); // clicking on the first investor from the list
        cy.contains('Investor Profiles');

        // Closing Investor Profile
        cy.CloseInvestorAccountAsAdmin(reasonField);

        cy.get('[jhisortby="idnp"]').click(); //sorting ascending investor profiles

        // Set investor profile status back to "Active"
        cy.SetInvestorProfileStatusBackToActiveAsAdmin();
        
    });
});