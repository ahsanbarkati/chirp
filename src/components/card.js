import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import {Grid} from "@material-ui/core";
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1045,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export function CenteredCard({tweet}) {
    console.log("tweet")
    console.log(tweet)
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
            style={{backgroundColor: "white", padding: 16}}
        >
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                <Grid
                    item
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    <Avatar aria-label="recipe" className={classes.avatar} src={tweet.createdBy.profilePic}
                            style={{width: 40}}/>
                </Grid>
                <Grid
                    item
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                    style={{padding: 8}}
                >
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <Typography variant={"h6"} component={"h6"}
                                    style={{fontWeight: "bold"}}>{tweet.createdBy.name}</Typography>
                        <span>&nbsp;&nbsp;&nbsp;</span>
                        <Typography variant={"caption"}
                                    component={"span"}>@{tweet.createdBy.username} . {new Date(tweet.createdAt).toDateString()}</Typography>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                        style={{marginTop: 8, marginBottom: 8}}
                    >
                        <Typography variant={"body1"} component={"span"}>{tweet.text}</Typography>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                    >
                        <IconButton><ChatBubbleOutlineIcon/>&nbsp;&nbsp;{tweet.comments.length}</IconButton>
                        <IconButton><SwapHorizIcon/>&nbsp;&nbsp;{tweet.retweets.length}</IconButton>
                        <IconButton><FavoriteBorderIcon/>&nbsp;&nbsp;{tweet.likedBy.length}</IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <div style={{border: "solid grey 1px", width: "100%"}} ></div>
        </Grid>
    )
        ;
}