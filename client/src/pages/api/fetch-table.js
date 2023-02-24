import {MongoClient, ObjectId} from "mongodb";

async function handler(req, res) {
    if (req.method === "POST") {
        const data = req.body;
        const client = await MongoClient.connect("mongodb+srv://zzangkbc1:ML5svjETdraNKLuV@cluster0.snz22kc.mongodb.net/?retryWrites=true&w=majority")
        const db = client.db();
        const postItCollection = db.collection("tableData");
        for(let i=0; i<data.length; i++){
        const result = await postItCollection.updateMany({_id: new ObjectId(data[i].id)}, {$set : {
                pinned:data[i].pinned,
                style:data[i].style,
                userId:data[i].userId,
                contents:data[i].contents,
                width:data[i].width,
                height:data[i].height,
                positionX:data[i].positionX,
                positionY:data[i].positionY,
                positionZ:data[i].positionZ,
            }}, {upsert: true});
        }
        client.close();
        res.status(201).json({message: "success"})
    }
}

export default handler;