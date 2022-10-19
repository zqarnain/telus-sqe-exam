describe('Update User Profile', () => {
    let url, credentials, userProfile

    beforeEach(function () {
        cy.fixture('url').then(function (data) {
            this.url = data
        })

        cy.fixture('credentials').then(function (data) {
            this.credentials = data
        })

        cy.fixture('userProfile').then(function (data) {
            this.userProfile = data
        })
    })

    describe('Invoke Telus-International AI URL', () => {
        it('Launch Website', function () {
            cy.visit(this.url.baseURL)

            cy.wait(5000)
        })


        it('Validate Telus logo is displayed and has correct href link', () => {
            cy.get('a[aria-label="logo"]').should('be.visible')

            cy.get('a[aria-label="logo"]').should('have.attr', 'href').and('include', '/cmp/')
        })

        it('Validate Welcome back! text is displayed in the login page', () => {
            cy.get('div[class="tw-col-start-2 tw-col-span-5 lg:tw-col-span-12 md:tw-col-span-12 sm:tw-col-span-12 xs-tw-col-span-12  tw-mt-7"]')
            .children('h1[class="sui-font-heading sui-text-dh2 sui-text-darkGray-darker tw-font-bold"]')
            .should('have.text', 'Welcome back!')
        })
    })


    describe('Authenticate User', () => {
        it('Enter Username', function () {
            cy.get('input[name="email"]')
            .type(this.credentials.username)
            .should('have.value', 'zronsing@gmail.com')
        })

        it('Click Submit Button', () => {
            cy.get('button[type=submit]')
            .click()
        })

        it('Enter Password', function () {
            cy.get('input[name="password"]')
            .type(this.credentials.password)
        })

        it('Click Sign-in Button', () => {
            cy.get('button[type=submit]')
            .click()

            cy.wait(5000)
        })
    })

    describe('Update Basic Information', () => {
        describe('Navigate to My Profile Page' , () => {
            it('Click Profile Icon', () => {
                cy.get('button[class="sui-flex sui-items-center focus:sui-outline-none"]').click()
            })

            it('Click My Profile', () => {
                cy.get('span[class="sui-ml-sm"]')
                .contains('My Profile')
                .click()

                cy.wait(3000)
            })

            it('Validate Profile Page URL', function () {
                cy.url().should('eq', this.url.profileURL)
            })
        })

        describe('Update Contact Information', () => {


            it('Click Contact Info Edit Button', () => {
                cy.get('div[class="contact-info border-top tw-mb-6 ml-0"]')
                .children('div[class="row figma-section-header-text-margin"]')
                .children('div[class="col-lg-2 col-md-2"]')
                .children('button[type=button]').click()

                cy.wait(1000)
            })

            it('Validate Contact Info Save Button is Disabled', () => {
                cy.get('button[aria-disabled="true"]').should('be.disabled')
            })

            it('Update Firstname', function () {
                cy.get('input[name="first_name"]').then(($input) => {
                    const first_name = $input.val()

                    if (first_name == 'Zul') {
                        cy.get('input[name="first_name"]').clear()
                        cy.get('input[name="first_name"]')
                        .type(this.userProfile.contact.firstName)
                    } else {
                        cy.get('input[name="first_name"]').clear()
                        cy.get('input[name="first_name"]')
                        .type(this.userProfile.contact.nickName)
                    }
                })
            })

            it('Update Middlename', function () {
                cy.get('input[name="middle_name"]').then(($input) => {
                    const middle_name = $input.val()

                    cy.get('input[name="middle_name"]').clear()
                    switch (middle_name) {
                        case '':
                        case 'A.':
                            cy.get('input[name="middle_name"]')
                            .type(this.userProfile.contact.middleName)
                            break;
                        default:
                            cy.get('input[name="middle_name"]')
                            .type(this.userProfile.contact.middleInitial)
                            break;
                    }
                })
            })

            it('Update Contact Number Value', function () {
                cy.get('input[name="phone_number.line_number"]').then(($input) => {
                    const phone_number = $input.val()

                    cy.get('input[name="phone_number.line_number"]').clear()
                    switch (phone_number) {
                        case '':
                        case '9190627118':
                            cy.get('input[name="phone_number.line_number"]')
                            .type(this.userProfile.contact.phoneNumber2)
                            break;
                        default:
                            cy.get('input[name="phone_number.line_number"]')
                            .type(this.userProfile.contact.phoneNumber1)
                            break;
                    }
                })

                cy.wait(1000)
            })

            it('Validate Contact Info Save Button is Enabled', () => {
                cy.get('button[aria-disabled="false"]').should('be.enabled')
            })

            it('Click Contact Info Save Button', () => {
                cy.get('button[aria-disabled="false"]').click()

                cy.wait(3000)
            })
        })

        describe('Update Location', () => {
            it('Click Location Edit Button', () => {
                cy.get('div[class="location border-top border-top"]')
                .children('div[class]')
                .children('div[class="row mt-6"]')
                .children('div[class="col-lg-2 col-md-2"]')
                .children('button[type=button]').click()

                cy.wait(1000)
            })

            it('Validate Location Save Button is Disabled', () => {
                cy.get('button[aria-disabled="true"]').should('be.disabled')
            })

            it('Update Street Value', function () {
                cy.get('input[name="streetAddress"]').then(($input) => {
                    const street = $input.val()

                    cy.get('input[name="streetAddress"]').clear()
                    switch (street) {
                        case '':
                        case 'EDSA corner Madison Street':
                            cy.get('input[name="streetAddress"]').type(this.userProfile.location.street1)
                            break;
                        default:
                            cy.get('input[name="streetAddress"]').type(this.userProfile.location.street2)
                            break
                    }
                })
            })

            it('Update City and State Value', function () {
                cy.get('input[name="cityAndState"]').then(($input) => {
                    const cityAndState = $input.val()

                    cy.get('input[name="cityAndState"]').clear()
                    switch (cityAndState) {
                        case '':
                        case 'Mandaluyong City, National Capital Region':
                            cy.get('input[name="cityAndState"]').type(this.userProfile.location.cityAndState1)
                            break;
                        default:
                            cy.get('input[name="cityAndState"]').type(this.userProfile.location.cityAndState2)
                            break;
                    }
                    cy.wait(6000)
                    cy.get('ul li:first').click()
                    cy.wait(3000)
                })
            })

            it('Update Postal Code Value', function () {
                cy.get('input[name="postalCode"]').then(($input) => {
                    const postalCode = $input.val()

                    cy.get('input[name="postalCode"]').clear()
                    switch (postalCode) {
                        case '':
                        case '1550':
                            cy.get('input[name="postalCode"]').type(this.userProfile.location.postalCode1)
                            break;
                        default:
                            cy.get('input[name="postalCode"]').type(this.userProfile.location.postalCode2)
                            break;
                    }
                })

                cy.wait(1000)
            })

            it('Validate Location Save Button is Enabled', () => {
                cy.get('button[aria-disabled="false"]').should('be.enabled')
            })

            it('Click Location Save Button', () => {
                cy.get('button[aria-disabled="false"]').click()

                cy.wait(3000)
            })

            it('Validate Successfully Saved Notification Appeared', () => {
                cy.get('div[class="sui-flex sui-gap-3 tw-p-3"]')
                .children('div')
                .children('p[class="suit-text-h4 sui-text-darkGray-darker tw-font-bold"]')
                .contains('Success')
                .should('be.visible')

                cy.get('div[class="sui-flex sui-gap-3 tw-p-3"]')
                .children('div')
                .children('p[class="tw-font-normal suit-text-h5 sui-text-darkGray-darker sui-pt-sm"]')
                .contains('Location successfully saved!')
                .should('be.visible')
            })

        })
    })

    describe('Update Languages', () => {
        describe('Navigate to Languages Page', () => {
            it('Click Languages Left Navigation Menu', () => {
                cy.get('a[href="/cmp/contributor/userprofile/languages"]').click()

                cy.wait(3000)
            })

            it('Validate Language Page URL', function () {
                cy.url().should('eq', this.url.languageURL)
            })
        })

        describe('Add Other Languages', () => {
            it('Click Other Languages Add Button', () => {
                cy.get('div[class="row figma-section-header-text-margin"]')
                .children('div[class="col-lg-2 col-md-2"]')
                .children('button').click()

                cy.wait(1000)
            })

            it('Select Language', () => {
                cy.get('input[aria-label="Type language and select*"]')
                .type('Chiga (Uganda){enter}')
            })

            it('Select Proficiency Level', () => {
                cy.get('input[aria-label="Select proficiency level*"]')
                .type('Native or bilingual proficiency{enter}')
            })

            it('Click Add Language Save Button', () => {
                cy.get('button[aria-disabled="false"]').click()

                cy.wait(3000)
            })
        })

        describe('Remove Other Languages', () => {
            it('Click Delete Button', () => {
                cy.get('div[class="wrapper-update-section tw-pt-3"]')
                .children('div[class="trash-div"]')
                .children('svg[class="svg-inline--fa fa-trash-alt fa-w-14"]')
                .click()

                cy.wait(1000)
            })

            it('Confirm Delete Other Language', () => {
                cy.get('button[type=submit]').click()

                cy.wait(3000)
            })
        })
    })

    describe('Sign-out from the Application', () => {
        it('Click Profile Icon', () => {
            cy.get('button[class="sui-flex sui-items-center focus:sui-outline-none"]').click()
        })

        it('Click Sign-out', () => {
            cy.get('span[class="sui-ml-sm"]')
            .contains('Sign Out')
            .click()

            cy.wait(3000)
        })
    })
})