import {MongoClient} from "mongodb";
async function handler(req, res){
    if(req.method === "POST"){
        const data = req.body;
        const client = await MongoClient.connect("mongodb+srv://zzangkbc1:ML5svjETdraNKLuV@cluster0.snz22kc.mongodb.net/?retryWrites=true&w=majority");
        const db = client.db();
        const fontCollection = db.collection("fontData");
        const result = await fontCollection.insertOne(data);
        client.close();
        res.status(201).json({message: "success"});
    }
}
export default handler;