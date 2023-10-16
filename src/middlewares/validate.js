export const validate = (schema) => {
  return (req, res, next) => {

    let errors =[]
    const { error } = schema.validate(
      {
        ...req.body,
        ...req.params,
        ...req.query,
      },
      { abortEarly: false }
    );

    console.log(error);
    if (error) {
        error.details.forEach((ele)=> {
            res.json({message:ele.message,field:ele.path[0]})
        });
      console.log(errors);
      res.json(errors);
    }else{
        next()
    }
  };
};
