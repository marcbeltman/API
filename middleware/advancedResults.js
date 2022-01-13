// sectie 6 les 44

const advancedResults = (model) => async (req, res, next) => {
    let query;

    // copy req.query
    const reqQuery = { ... req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // loop over remove fields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    //console.log(reqQuery);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

   
    // create opperators parameters voor de query
    // gt = greater than, gte = greater than or equal, lt = less than, lte = les than or equal, in = search list
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    //console.log(queryStr);
    
    // finding resource
    query = model.find(JSON.parse(queryStr));

    // select fields
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    // sort
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 100;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments();

    query = query.skip(startIndex).limit(limit);


    // excuting query
    const results = await query;

    // Pagination result
    const pagination = {};

    if(endIndex < total) {
        pagination.next = {
           page: page + 1,
           limit: limit
        }
    }

    if(startIndex > 0) {
        pagination.prev = {
           page: page - 1,
           limit: limit
        }
    }
    res.advancedResults ={
        success: true,
        count: results.length,
        pagination,
        data: results
    }

    next();
};

module.exports = advancedResults;