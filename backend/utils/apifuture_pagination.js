class apifuture{
    constructor(query,querystr){
        this.query = query;
        this.querystr=querystr;
    }

    search()
    {
        const keyword=this.querystr.keyword ? {
            name:{
                $regex:this.querystr.keyword,
                $options:"i",  //case insensitive capital small kus bhi search kar skte hai
            },
        }:{};

        this.query=this.query.find({...keyword});
        return this;
    }
    //for catagory of product
   filter(){ 
       const querycopy={...this.querystr} //for copy of querystr because it is reference -object
       //remove some fields for catagory
       
       const removefileds=["keyword","page","limit"];
       removefileds.forEach(key=>delete querycopy[key]);
         
       //filter for price and rating
         
         //querycopy object hai isko string me convert karenge
         let queryString=JSON.stringify(querycopy);
        queryString= queryString.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);
        //firse string ko object me convert
    

       this.query=this.query.find(JSON.parse(queryString));
        return this;
   }

   //paginations

   pagination(resultpages){
       const currentpage =Number(this.querystr.page) || 1;
      //ex: jaise 2nd page ho to first 4 product skip kyu ki har page pe 4 product hai
       const skippage=resultpages * (currentpage - 1);

       this.query=this.query.limit(resultpages).skip(skippage);
       return this;

   }

}

module.exports =apifuture;