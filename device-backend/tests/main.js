const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

  describe('Check Request Data', function() {
    it('should check to see data is correct', function(done) {
      //test data that will be sent using post request
      const testDataset = 
      {
       test:'test'
      } 
      //post request using chai 
      chai.request('http://localhost:3000')
        .post('/getBLEs')
        .send(testDataset)
        .end(function(err, res) {
        //expect the request to go through with status code 200
         expect(res).to.have.status(200);
         
          //expect the response data to equal the test dataset, showing the request works
          expect(res.body).to.deep.equal(testDataset);

          done();
        });
   }); 
  });    
   


 describe('Check Location Update', function() {
  it('should check to see if the beacon updates location', function(done) {
    //test data, has to have a relevant beaconID and location to work properly
    const testDataset = 
    {
      beaconID: "Bob",
      location: "General Practitioner"
    } 
     //chai post request
    chai.request('http://localhost:3000')
      .post('/update')
      //send request
      .send(testDataset)
      .end(function(err, res) {
      //expect the response to have 200 status
        expect(res).to.have.status(200);
      //expect the response to be equal to the dataset
      //simulate beacon update
        expect(res.body).to.deep.equal(testDataset);

        done();
      });
   }); 
 });  
  
