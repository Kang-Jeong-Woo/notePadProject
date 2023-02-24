import {MongoClient} from "mongodb";
async function handler(req, res){
    if(req.method === "POST"){
        const data = req.body;
        const client = await MongoClient.connect("mongodb+srv://zzangkbc1:ML5svjETdraNKLuV@cluster0.snz22kc.mongodb.net/?retryWrites=true&w=majority");
        const db = client.db();
        const postItCollection = db.collection("drawData");
        const result = await postItCollection.updateOne({userId:data.userId},{$set:{saveImage:data.saveImage}},{upsert:true});
        client.close();
        res.status(201).json({message:"성공"})
    }
}
export default handler;