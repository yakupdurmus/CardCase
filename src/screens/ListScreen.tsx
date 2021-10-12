import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { getCards } from '../request';
import { IDefaultScreenProps, IAllCardsResponse } from '../interface';


const Cards = (props: IDefaultScreenProps) => {
    const [loading, setLoading] = React.useState(true);
    const [allCards, setAllCards] = React.useState<IAllCardsResponse>();
    const [cardNames, setCardNames] = React.useState<string[]>([]);
    const [search, setSearch] = React.useState<string[]>([]);


    const load = async () => {

        setLoading(true)
        getCards().then(res => {
            setAllCards(res);
            setCardNames(Object.keys(res))
            setLoading(false)
        }).catch(err => setLoading(false))

    };

    React.useEffect(() => {
        load();
    }, []);

    const onPress = (cardName: string) => {

        const { navigation } = props
        navigation.navigate('Detail', {
            cards: allCards && allCards[cardName]
        })
    }

    const renderItem = (cardName: string): JSX.Element => (
        <TouchableOpacity
            onPress={() => onPress(cardName)}>
            <Text>{cardName}</Text>
        </TouchableOpacity>
    );

    const onChange = (val: string) => {
        if (val == "") {
            setSearch([]);
        } else {
            const _filter = cardNames.filter(item => item.toUpperCase().includes(val.toUpperCase()))
            setSearch(_filter)
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <TextInput
                    onChangeText={onChange}
                    style={styles.input}
                    placeholder="🔍 Search"
                />
            </View>
            <FlatList
                data={search.length == 0 ? cardNames : search}
                keyExtractor={(_, i) => 'card-' + i}
                renderItem={({ item }) => renderItem(item)}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => <View style={styles.seperator} />}
                refreshing={loading}
                onRefresh={load}
            />
        </View>
    );
};

export default Cards;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff'
    },
    listContent: {
        padding: 5,
    },
    listHeader: {
        alignSelf: 'center',
        marginVertical: 10,
    },
    seperator: {
        marginVertical: 5,
    },
    input: {
        padding: 10,
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 3,
    },
});