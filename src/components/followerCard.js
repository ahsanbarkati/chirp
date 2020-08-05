import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import {red} from '@material-ui/core/colors';
import {Grid} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1000
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export function FollowerCard({user}) {
    console.log("user in card: ", user)
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            style={{backgroundColor: "white", height: 80, padding: 16, border: "solid grey 1px"}}
        >

            <Avatar alt="profile pic" src={user?.profilePic}
                    style={{border: "solid white 4px", height: 50, width: 50}}/>
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                style={{ padding: 16}}
            >
                <Link href={"/profile/" + user?.username} variant={"body1"}>{user.name}</Link>
                <Typography variant={"caption"} component={"span"}>{user.username}</Typography>
                <Typography variant={"body1"} component={"span"}>{user.info}</Typography>
            </Grid>
        </Grid>
    );
}