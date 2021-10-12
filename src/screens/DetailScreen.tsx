import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import DetailItem from '../components/DetailItem';

const DetailScreen = (props: any) => {

    const { route: { params: { cards } } } = props

    if (!cards || cards.length == 0) return <Text style={styles.emptyText}>Cards Items is empty.</Text>

    return (<FlatList
        data={cards}
        renderItem={({ item }) => <DetailItem card={item} />}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
        contentContainerStyle={styles.listContent}
        keyExtractor={(_, i) => 'mech-' + i}
    />)
}


export default DetailScreen;

const styles = StyleSheet.create({
    content: {
        margin: 15,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    mechanics: {
        fontSize: 16,
        marginBottom: 5,
        marginTop: 15,
    },
    listContent: {
        paddingLeft: 5,
    },
    seperator: {
        marginVertical: 5,
    },
    emptyText: {
        alignSelf: 'center',
        marginTop: 20
    }
});