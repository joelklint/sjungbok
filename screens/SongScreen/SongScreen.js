import React from 'react'
import { 
    StyleSheet,
    ScrollView, 
    Text,
    Platform,
    TouchableWithoutFeedback
} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import R from 'ramda'

class AllSongsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { title, starred, toggleStar } = navigation.state.params
        let iconName = ''
        switch(starred) {
            case true:
                iconName = Platform.OS === 'ios' 
                    ? 'ios-heart' 
                    : 'md-heart'
                break;
            case false:
            default:
                iconName = Platform.OS === 'ios' 
                    ? 'ios-heart-outline' 
                    : 'md-heart-outline'
                break;
        }
        return {
            title: title,
            headerRight: (
                <TouchableWithoutFeedback onPress={toggleStar}>
                    <Ionicons 
                        name={iconName} 
                        style={styles.headerStar}
                        size={25}
                        color={starred === true ? 'red' : 'black'}
                    />
                </TouchableWithoutFeedback>
            )
        }
    }

    // Send relevant prop updates to header via react navigation
    componentWillReceiveProps(nextProps) {
        const props = this.props
        const navProps = this.props.navigation.state.params
        let newParams = {}
        if(nextProps.starred !== props.starred)
            newParams.starred = nextProps.starred
        if(navProps.title !== nextProps.song.title)
            newParams.title = nextProps.song.title
        if(Object.keys(newParams).length !== 0) {
            props.navigation.setParams(newParams)
        }
    }

    render() {
        const { song } = this.props
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.text}>{song.lyrics}</Text>
            </ScrollView>
        )
    }
}

export default AllSongsScreen

const styles = StyleSheet.create({
    container: {
    },
    text: {
        textAlign: 'center',
        margin: 20,
        fontSize: 20,
    },
    headerStar: {
        paddingVertical: 8,
        paddingHorizontal: 15,
    }
})