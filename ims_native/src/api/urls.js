const serverUrl = {

    baseUrl: 'https://5f9e-2401-4900-1c2a-beb-60d7-64d9-9307-82cc.ngrok-free.app',
    invoiceApi: 'https://5f9e-2401-4900-1c2a-beb-60d7-64d9-9307-82cc.ngrok-free.app/api/generateBillPdf/',




    //sales
    getSales: '/api/getTotalSalesCount',
    getSalesByDate: '/api/getSalesByDate',
    getTopSellingProducts: '/api/getTopSellingProducts',
    getTotalDeliveryProducts: '/api/getTotalDeliveryProducts',
    getSalesByWeek: '/api/getSalesByWeek',
    getOrderQuantityByWeek: '/api/getOrderQuantityByWeek',

    //profile
    getGodownHead: '/api/getGodownHead',
    updateGodownHead: '/api/updateGodownHead',
    updatePassword: '/api/updatePassword',

    //products

    getAllProducts: '/api/listAllProducts',
    addProduct:'/api/addProduct',
    updateProduct:'/api/updateProduct',
    singleProduct:'/api/getAllProduct',

    getGodownProducts: '/api/listProducts/',

    //supplier
    createSupplier: '/api/createSupplier',
    createCustomer: '/api/createCustomer',
    createGodown: '/api/createGodown',
    createGodownhead: '/api/register',
    updateSupplier: '/api/updateSuppliers',
    getAllSuppliers: '/api/getAllSuppliers',

    //delivery
    getAllDelivery: '/api/getDeliveryOrders',
    getDeliveryOrdersById: '/api/getDeliveryOrdersById/',
    downloadInvoice: '/api/generateBillPdf/',

    getDeliveryOrdersByGodownId: '/api/getDeliveryOrdersByGodownId/',

    placeOrder: '/api/placeOrder/',


    //purchase
    getAllPurchase : '/api/getAllPurchaseOrders',
    getPurchaseOrderByPurchaseId: 'api/getPurchaseOrderByPurchaseId',
    getPurchaseProductCountBygodownId: '/api/getPurchasedProductsCountByGodownId/',
    getPurchaseProductsCount: '/api/getPurchasedProductsCount',
    



    //customers
    getAllCustomers: '/api/getAllCustomers',
    getCustomerById: 'api/getCustomerById',
    updateCustomer: 'api/updateCustomerById',


    //godowns
    getAllGodowns: '/api/getAllGodown',


    //login
    login: 'api/login',
    sendOtp: '/api/sendOtp',
    resetPassword: '/api/resetpassword',
    verifyOtp: '/api/verifyotp',

    //logout
    logout:'/api/logout',


    //admin
    getAllGodown:'/api/getAllGodown',
    getDeliveryOrders:'/api/getDeliveryOrders',


    //Details
    getPurchaseDetails: '/api/getPurchaseOrderByPurchaseId',
    getDeliveryDetails: '/api/getDeliveryOrdersById',
    getGodownDetails: '/api/getGodown',
    getCapacity:'/api/getCapacity/',
    getGodwnCount:'/api/getGodwnCount',
    
    // Purchase Order
    createPurchaseOrder: '/api/createPurchaseOrder',
    getCapacity: '/api/getCapacity/',
    getGodwnCount: '/api/getGodwnCount',
    getSalesByWeek: '/api/getSalesByWeek',

}

export default serverUrl;