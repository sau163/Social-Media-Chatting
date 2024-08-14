import React from 'react';
import { Helmet} from 'react-helmet-async';

const Title = ({
    title = "Darkchat",
    description = "this is a dark chat app",
}) => {
    return(
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Helmet>
    );
}
export default Title;