import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import { ICard } from '../interface';

interface IProps {
    card: ICard
}

const DetailScreen = (props: IProps) => {

    const { card } = props

    if (!card) return <Text style={styles.emptyText}>Cards Items is empty.</Text>

    return (
        <View>
            <View style={styles.content}>
                <Text>ID: {card.cardId}</Text>
                <Text>Name: {card.name}</Text>
                <Text>Card Set: {card.cardSet}</Text>
                <Text>Player Class: {card.playerClass}</Text>
                {card.text && <Text>Text: {card.text}</Text>}
                {card.mechanics && <Text style={styles.mechanics}>Mechanics :</Text>}
                {card.img && <Image style={styles.img} source={{ uri: card.img }} />}
                <FlatList
                    data={card.mechanics}
                    renderItem={({ item }) => <Text>{item.name}</Text>}
                    ItemSeparatorComponent={() => <View style={styles.seperator} />}
                    contentContainerStyle={styles.listContent}
                    keyExtractor={(_, i) => 'mech-' + i}
                />
            </View>
        </View>
    )
}

const mapStateToProps = ({ cards: { card } }: any) => {

    return {
        card
    };
};

export default connect(mapStateToProps)(DetailScreen)

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
    img: {
        width: '100%',
        height: 500,
        alignSelf: 'center',
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