const responseForm = {
  success: function (res, data, status) {
    const responseObj = {
      isSuccess: true,
      status: status,
      data: data,
    };
    res.json(responseObj);
  },
  error: function (res, err, status) {
    const responseObj = {
      isSuccess: false,
      status: status,
      data: err,
    };
    res.json(responseObj);
  },
  pagination: function (query, res, data,status) {
    const page = Number(query.page);
    const limit = Number(query.limit);
    const prevPage =
      page === 1 ? "" : `/menu/pagination?page=${page - 1}&limit=${limit}`;
    const nextPage = `/menu/pagination?page=${page + 1}&limit=${limit}`;
    const resObj = {
      isSuccess: true,
      status: status,
      data,
      prevPage,
      nextPage,
    };
    res.json(resObj);
  },
};

module.exports = responseForm;
