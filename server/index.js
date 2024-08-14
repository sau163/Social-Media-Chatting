import {server} from './app.js';
import connectToDB from './config/config.js';
import { v2  } from 'cloudinary';


v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const PORT = process.env.PORT || 3002;

server.listen(PORT, async() => {
    await connectToDB();
    
    console.log(`Server is running on port ${PORT}`);
});


