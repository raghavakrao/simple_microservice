const productController = require('./product.controller');
const { products } = require('../models');

jest.mock('../models', () => ({
  products: {
    create: jest.fn(),
    findByPk: jest.fn(),
    increment: jest.fn(),
    findAll: jest.fn(),
    destroy: jest.fn()
  },
  Sequelize:{
    op: jest.fn()
  }
}));

function responseStub() {
    return {
        status: function (statusCode) {
            return {
                send: function (payload) {
                    return {
                        status: statusCode,
                        payload: payload
                    }
                }
            }
        },
        send: function (payload) {
            return {
                status: 200,
                payload: payload
            }
        },
        sendStatus: function (statusCode) {
            return {
                status: statusCode
            }
        }
    };
}

describe('Api test cases', () => {
  beforeEach(() => {
      jest.clearAllMocks();
  });

  it("Create api should return error if no input params exists", async ()=> {
    let response = productController.create({body : {}}, responseStub());
    console.log(response);
  });
});
