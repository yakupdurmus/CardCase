import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'

const DetailItem = ({ card }: any) => {

    return (
        <View>
            <View style={styles.content}>
                <Text>ID: {card?.cardId}</Text>
                <Text>Name: {card?.name}</Text>
                <Text>Card Set: {card?.cardSet}</Text>
                <Text>Player Class: {card?.playerClass}</Text>
                {card?.text && <Text>Text: {card?.text}</Text>}
                {card?.mechanics && <Text style={styles.mechanics}>Mechanics :</Text>}
                <FlatList
                    data={card?.mechanics}
                    renderItem={({ item }) => <Text>{item.name}</Text>}
                    ItemSeparatorComponent={() => <View style={styles.seperator} />}
                    contentContainerStyle={styles.listContent}
                    keyExtractor={(_, i) => 'mech-' + i}
                />
            </View>
        </View>
    );
};

export default DetailItem

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
    }
});