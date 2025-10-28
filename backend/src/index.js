import server from './server.js';
import { PORT } from './constants/env.js';


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



