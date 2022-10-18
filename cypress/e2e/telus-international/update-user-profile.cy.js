context('Update User Profile', () => {
    it('Invoke Telus-International URL', () => {
        cy.visit('https://www.telusinternational.ai/cmp')
    })

    describe('Authenticate User', () => {
        it('Enter Username', () => {
            cy.get('input[name="email"]')
            .type('zronsing@gmail.com')
            .should('have.value', 'zronsing@gmail.com')
        })

        it('Click Submit Button', () => {
            cy.get('button[type=submit]')
            .click()
        })

        it('Enter Password', () => {
            cy.get('input[name="password"]')
            .type('Welcome06#')
        })

        it('Click Sign-in Button', () => {
            cy.get('button[type=submit]')
            .click()
        })
    })

    describe('Update Basic Information', () => {
        describe('Navigate to My Profile Page' , () => {
            it('Click Profile Icon', () => {
                cy.wait(5000).get('button[class="sui-flex sui-items-center focus:sui-outline-none"]').click()
            })

            it('Click My Profile', () => {
                cy.get('span[class="sui-ml-sm"]')
                .contains('My Profile')
                .click()
            })

            it('Validate Profile Page URL', () => {
                cy.wait(5000).url().should('eq', 'https://www.telusinternational.ai/cmp/contributor/userprofile/basic-info')
            })
        })

        describe('Update Contact Information', () => {


            it('Click Contact Info Edit Button', () => {
                cy.wait(5000)
                .get('div[class="contact-info border-top tw-mb-6 ml-0"]')
                .children('div[class="row figma-section-header-text-margin"]')
                .children('div[class="col-lg-2 col-md-2"]')
                .children('button[type=button]')
                .click()
            })

            it('Validate Save Button is Disabled', () => {
                cy.get('button[aria-disabled="true"]')
                .should('be.disabled')
            })

            it('Update Firstname', () => {
                cy.get('input[name="first_name"]').then(($input) => {
                    const first_name = $input.val()

                    if (first_name == 'Zul') {
                        cy.get('input[name="first_name"]').clear()
                        cy.get('input[name="first_name"]')
                        .type('Zul-Qarnain')
                    } else {
                        cy.get('input[name="first_name"]').clear()
                        cy.get('input[name="first_name"]')
                        .type('Zul')
                    }
                })
            })

            it('Update Middlename', () => {
                cy.get('input[name="middle_name"]').then(($input) => {
                    const middle_name = $input.val()

                    cy.log("Middlename: " +middle_name)

                    cy.get('input[name="middle_name"]').clear()
                    switch (middle_name) {
                        case '':
                        case 'A.':
                            cy.get('input[name="middle_name"]')
                            .type('Ayo')
                            break;
                        default:
                            cy.get('input[name="middle_name"]')
                            .type('A.')
                            break;
                    }
                })
            })

            it('Update Contact Number Value', () => {
                cy.get('input[name="phone_number.line_number"]').then(($input) => {
                    const phone_number = $input.val()

                    cy.get('input[name="phone_number.line_number"]').clear()
                    switch (phone_number) {
                        case '':
                        case '9190627118':
                            cy.get('input[name="phone_number.line_number"]')
                            .type('9770188363')
                            break;
                        default:
                            cy.get('input[name="phone_number.line_number"]')
                            .type('9190627118')
                            break;
                    }
                })
            })

            it('Validate Save Button is Enabled', () => {
                cy.get('button[aria-disabled="false"]')
                .should('be.enabled')
            })

            it('Click Save Button', () => {
                cy.get('button[aria-disabled="false"]')
                .click()
            })
        })

        describe('Update Location', () => {
            it('Click Location Edit Button', () => {
                cy.wait(5000)
                .get('div[class="location border-top border-top"]')
                .children('div[class]')
                .children('div[class="row mt-6"]')
                .children('div[class="col-lg-2 col-md-2"]')
                .children('button[type=button]')
                .click()
            })
        })
    })
})