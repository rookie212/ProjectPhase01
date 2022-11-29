const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://Cluster72928:Cluster72928@cluster0.bz2cuuo.mongodb.net/sample_restaurants?retryWrites=true&w=majority" 


async function findAll() {
    
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log("s2");console.log(err); });
    if (!client) return;
        
    try {
        console.log('1');
        const db =  client.db("sample_restaurants");
        console.log('2');
        let collection =  db.collection('restaurants');
        console.log('3');
        let cursor =  collection.find({}).limit(10);
        console.log('4');
        await cursor.forEach(doc => console.log(doc));
        console.log('5');
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}
setTimeout(()=>{
    findAll();
    console.log('iter');
}, 5000); 
