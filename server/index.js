import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging'
import express,{json} from 'express'
import bodyParser from "body-parser";
import cors from 'cors'

const app=express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

process.env.GOOGLE_APPLICATION_CREDENTIALS
// var serviceAccount = require("E:\shoppingcart\server\shoppingcart-c3ba2-firebase-adminsdk-pdkcb-428dd8ef73.json");

app.use((req,res,next)=>{
    res.setHeader('Content-Type','application/json')
    next()
})
app.use(
    cors({
        methods:['GET','POST','DELETE','UPDATE','PUT','PATCH']
    })
)

initializeApp({
  credential: applicationDefault(),
  projectId:"shoppingcart-c3ba2"
});

app.post('/sendrequest',(req,res)=>{
    const recievedtoken=req.body.token
    const message = {
        notification: {
          title: '$FooCorp up 1.43% on the day',
          body: '$FooCorp gained 11.80 points to close at 835.67, up 1.43% on the day.'
        },
        token:recievedtoken
      };
      
      // Send a message to devices subscribed to the combination of topics
      // specified by the provided condition.
      getMessaging().send(message)
        .then((response) => {
            res.status(200).json({
                message:'Successfully sent',
                token:recievedtoken
            })
          // Response is a message ID string.
          console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            res.status(400).send(error)
          console.log('Error sending message:', error);
        });
})

app.listen(5000,()=>{
    console.log('Listening in port 5000')
})