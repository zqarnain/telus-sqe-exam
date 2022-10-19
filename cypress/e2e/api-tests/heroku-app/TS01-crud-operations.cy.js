context('Scenario 01 - Create, Update, and Delete a Booking', () => {
    let authToken, bookingID

    describe('TC01 - Generate Authentication Token', () => {
        it('Send POST Request', () => {
            cy.request(
                'POST',
                'https://restful-booker.herokuapp.com/auth',
                {
                    "username" : "admin",
                    "password" : "password123"
                }
            ).then((response) => {
                authToken = response.body.token
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('token')
            })
        })
    })

    describe('TC02 - Create a Booking', () => {
        let response

        it('Send POST Request', () => {
            cy.request(
                'POST',
                'https://restful-booker.herokuapp.com/booking',
                {
                    "firstname" : "Software",
                    "lastname" : "Tester",
                    "totalprice" : 119,
                    "depositpaid" : true,
                    "bookingdates" : {
                        "checkin" : "2022-10-18",
                        "checkout" : "2022-10-19"
                    },
                    "additionalneeds" : "Breakfast and Lunch"
                }
            ).then((resp) => {
                bookingID = resp.body.bookingid
                response = resp
            })
        })

        it('Validate Newly Created Booking Details', () => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('bookingid')
            expect(response.body).to.have.property('booking')

            const bookingDetails = response.body.booking

            expect(bookingDetails).to.have.property('firstname', 'Software')
            expect(bookingDetails).to.have.property('lastname', 'Tester')
            expect(bookingDetails).to.have.property('totalprice', 119)
            expect(bookingDetails).to.have.property('depositpaid', true)
            expect(bookingDetails).to.have.property('bookingdates').to.have.property('checkin', '2022-10-18')
            expect(bookingDetails).to.have.property('bookingdates').to.have.property('checkout', '2022-10-19')
            expect(bookingDetails).to.have.property('additionalneeds', 'Breakfast and Lunch')
        })
    })

    describe('TC03 - Update a Booking', () => {
        let response

        it('Send PUT Request', () => {
            cy.request({
                method : 'PUT',
                url : 'https://restful-booker.herokuapp.com/booking/' +bookingID,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Cookie": "token="+authToken
                },
                body : {
                    "firstname" : "QE",
                    "lastname" : "Tester",
                    "totalprice" : 80,
                    "depositpaid" : false,
                    "bookingdates" : {
                       "checkin" : "2022-12-03",
                       "checkout" : "2022-12-29"
                    },
                    "additionalneeds" : "Dinner"
               }
            }).then((resp) => { response = resp })
        })

        it('Validate Updated Booking Details', () => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.not.property('bookingid')
            expect(response.body).to.have.not.property('booking')

            const bookingDetails = response.body

            expect(bookingDetails).to.have.property('firstname', 'QE')
            expect(bookingDetails).to.have.property('lastname', 'Tester')
            expect(bookingDetails).to.have.property('totalprice', 80)
            expect(bookingDetails).to.have.property('depositpaid', false)
            expect(bookingDetails).to.have.property('bookingdates').to.have.property('checkin', '2022-12-03')
            expect(bookingDetails).to.have.property('bookingdates').to.have.property('checkout', '2022-12-29')
            expect(bookingDetails).to.have.property('additionalneeds', 'Dinner')
        })
    })

    describe('TC04 - Delete a Booking', () => {
        it('Send DELETE Request', () => {
            cy.request({
                method : 'DELETE',
                url : 'https://restful-booker.herokuapp.com/booking/' +bookingID,
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": "token="+authToken
                }
            }).then((response) => {
                expect(response.status).to.eq(201)
            })
        })
    })
})

