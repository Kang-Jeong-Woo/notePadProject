import {MongoClient, ObjectId} from "mongodb";
async function handler(req, res){
    if(req.method === "POST"){
        const data = req.body;
        const client = await MongoClient.connect("mongodb+srv://zzangkbc1:ML5svjETdraNKLuV@cluster0.snz22kc.mongodb.net/?retryWrites=true&w=majority")
        const db = client.db();
        const selectedCollection = db.collection(data.colName);
        const result = await selectedCollection.deleteOne({_id: new ObjectId(data.id)});
        client.close();
        res.status(201).json({message:"success"})
    }
}
export default handler;