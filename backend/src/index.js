import server from './server.js';
import { PORT } from './constants/env.js';
import colors from 'colors';


server.listen(PORT, () => {
    console.log(colors.magenta(`Server is running on port ${PORT}`));
});



