import React from 'react';
import { Button, Picker, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

//import { ExpoConfigView } from '@expo/samples';
import { saveValue, clearCategory } from '../store/reducer';

export class SettingsScreen extends React.Component {
    state = {
        weight: '',
        output: '',
        typeList: ['Weight', 'Calories', 'Miles'],
        selectedType: 'Weight'
    };

    static navigationOptions = {
        title: 'Make an entry'
    };

    render() {
        /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
        //return <ExpoConfigView />;
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <Picker
                        selectedValue={this.state.selectedType}
                        onValueChange={(item, index) => {
                            this.setState({ selectedType: item });
                        }}>
                        {this.state.typeList.map((type, index) => {
                            return <Picker.Item label={type} value={type} key={index} />;
                        })}
                    </Picker>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        style={styles.input}
                        value={this.state.weight}
                        onChangeText={weight => this.setState({ weight })}
                        ref={ref => {
                            this._nameInput = ref;
                        }}
                        placeholder={this.state.selectedType}
                        autoFocus={true}
                        autoCapitalize="words"
                        autoCorrect={true}
                        keyboardType="numeric"
                        returnKeyType="done"
                        onSubmitEditing={this.saveValue}
                        blurOnSubmit={true}
                    />
                    <Button onPress={this.saveValue} title="Save Value" accessibilityLabel="Save the value" />
                    <Text style={styles.output}>{this.state.output}</Text>
                    <Button onPress={() => this.props.clearCategory(this.state.selectedType)} title="Clear Category" accessibilityLabel="Reset the category" />
                </ScrollView>
            </View>
        );
    }

    saveValue = () => {
        this.setState({ output: 'Values entered: ' + this.state.weight });
        this.props.saveValue(this.state.selectedType, this.state.weight);
    };
}

const mapStateToProps = state => ({
    state: state
});

const mapDispatchToProps = dispatch => {
    return {
        saveValue: (category, value) => dispatch(saveValue(category, value)),
        clearCategory: category => dispatch(clearCategory(category))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center'
    },
    contentContainer: {
        padding: 20
    },
    input: {
        //margin: 20,
        marginBottom: 20,
        height: 34,
        paddingHorizontal: 10,
        borderRadius: 4,
        borderColor: '#ccc',
        borderWidth: 1,
        fontSize: 16
    },
    output: {
        //margin: 20,
        marginTop: 20,
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50
    },
    homeScreenFilename: {
        marginVertical: 7
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)'
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center'
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3
            },
            android: {
                elevation: 20
            }
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center'
    },
    navigationFilename: {
        marginTop: 5
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center'
    },
    helpLink: {
        paddingVertical: 15
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7'
    }
});
