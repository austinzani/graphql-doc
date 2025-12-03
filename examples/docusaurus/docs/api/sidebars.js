module.exports = {
  "apiSidebar": [
    {
      "type": "category",
      "label": "User Management",
      "link": {
        "type": "generated-index"
      },
      "items": [
        {
          "type": "category",
          "label": "Mutations",
          "link": {
            "type": "generated-index"
          },
          "items": [
            {
              "type": "doc",
              "id": "user-management/mutations/create-user",
              "label": "createUser"
            },
            {
              "type": "doc",
              "id": "user-management/mutations/update-profile",
              "label": "updateProfile"
            },
            {
              "type": "doc",
              "id": "user-management/mutations/add-address",
              "label": "addAddress"
            }
          ],
          "collapsible": true,
          "collapsed": true
        },
        {
          "type": "category",
          "label": "Queries",
          "link": {
            "type": "generated-index"
          },
          "items": [
            {
              "type": "doc",
              "id": "user-management/queries/me",
              "label": "me"
            },
            {
              "type": "doc",
              "id": "user-management/queries/user",
              "label": "user"
            },
            {
              "type": "doc",
              "id": "user-management/queries/users",
              "label": "users"
            }
          ],
          "collapsible": true,
          "collapsed": true
        }
      ],
      "collapsible": true,
      "collapsed": true
    },
    {
      "type": "category",
      "label": "Product Catalog",
      "link": {
        "type": "generated-index"
      },
      "items": [
        {
          "type": "category",
          "label": "Categories",
          "link": {
            "type": "generated-index"
          },
          "items": [
            {
              "type": "doc",
              "id": "product-catalog/categories/category",
              "label": "category"
            },
            {
              "type": "doc",
              "id": "product-catalog/categories/categories",
              "label": "categories"
            }
          ],
          "collapsible": true,
          "collapsed": true
        },
        {
          "type": "category",
          "label": "Mutations",
          "link": {
            "type": "generated-index"
          },
          "items": [
            {
              "type": "doc",
              "id": "product-catalog/mutations/create-product",
              "label": "createProduct"
            },
            {
              "type": "doc",
              "id": "product-catalog/mutations/update-product",
              "label": "updateProduct"
            },
            {
              "type": "doc",
              "id": "product-catalog/mutations/delete-product",
              "label": "deleteProduct"
            }
          ],
          "collapsible": true,
          "collapsed": true
        },
        {
          "type": "category",
          "label": "Queries",
          "link": {
            "type": "generated-index"
          },
          "items": [
            {
              "type": "doc",
              "id": "product-catalog/queries/product",
              "label": "product"
            },
            {
              "type": "doc",
              "id": "product-catalog/queries/products",
              "label": "products"
            }
          ],
          "collapsible": true,
          "collapsed": true
        },
        {
          "type": "category",
          "label": "Search",
          "link": {
            "type": "generated-index"
          },
          "items": [
            {
              "type": "doc",
              "id": "product-catalog/search/search",
              "label": "search"
            }
          ],
          "collapsible": true,
          "collapsed": true
        }
      ],
      "collapsible": true,
      "collapsed": true
    },
    {
      "type": "category",
      "label": "Orders & Checkout",
      "link": {
        "type": "generated-index"
      },
      "items": [
        {
          "type": "category",
          "label": "Cart",
          "link": {
            "type": "generated-index"
          },
          "items": [
            {
              "type": "doc",
              "id": "orders-checkout/cart/cart",
              "label": "cart"
            },
            {
              "type": "doc",
              "id": "orders-checkout/cart/add-to-cart",
              "label": "addToCart"
            },
            {
              "type": "doc",
              "id": "orders-checkout/cart/update-cart-item",
              "label": "updateCartItem"
            },
            {
              "type": "doc",
              "id": "orders-checkout/cart/remove-from-cart",
              "label": "removeFromCart"
            }
          ],
          "collapsible": true,
          "collapsed": true
        },
        {
          "type": "category",
          "label": "Checkout",
          "link": {
            "type": "generated-index"
          },
          "items": [
            {
              "type": "doc",
              "id": "orders-checkout/checkout/place-order",
              "label": "placeOrder"
            }
          ],
          "collapsible": true,
          "collapsed": true
        },
        {
          "type": "category",
          "label": "Queries",
          "link": {
            "type": "generated-index"
          },
          "items": [
            {
              "type": "doc",
              "id": "orders-checkout/queries/order",
              "label": "order"
            },
            {
              "type": "doc",
              "id": "orders-checkout/queries/my-orders",
              "label": "myOrders"
            }
          ],
          "collapsible": true,
          "collapsed": true
        },
        {
          "type": "category",
          "label": "Subscriptions",
          "link": {
            "type": "generated-index"
          },
          "items": [
            {
              "type": "doc",
              "id": "orders-checkout/subscriptions/order-status-changed",
              "label": "orderStatusChanged"
            }
          ],
          "collapsible": true,
          "collapsed": true
        }
      ],
      "collapsible": true,
      "collapsed": true
    },
    {
      "type": "category",
      "label": "Reviews & Ratings",
      "link": {
        "type": "generated-index"
      },
      "items": [
        {
          "type": "doc",
          "id": "reviews-ratings/review",
          "label": "review"
        },
        {
          "type": "doc",
          "id": "reviews-ratings/create-review",
          "label": "createReview"
        },
        {
          "type": "doc",
          "id": "reviews-ratings/mark-review-helpful",
          "label": "markReviewHelpful"
        }
      ],
      "collapsible": true,
      "collapsed": true
    },
    {
      "type": "category",
      "label": "Notifications",
      "link": {
        "type": "generated-index"
      },
      "items": [
        {
          "type": "doc",
          "id": "notifications/notification-received",
          "label": "notificationReceived"
        }
      ],
      "collapsible": true,
      "collapsed": true
    }
  ]
};