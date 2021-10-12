import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { getCards, getSearchCards } from '../request';
import { IDefaultScreenProps, IAllCardsResponse, ICard } from '../interface';
import { setCard } from '../actions';
import { connect } from 'react-redux';


const Cards = (props: IDefaultScreenProps) => {
    const [loading, setLoading] = React.useState(false);
    const [allCards, setAllCards] = React.useState<ICard[]>();
    const [searchCards, setSearchCards] = React.useState<ICard[]>([]);
    const [searchText, setSearchText] = React.useState<string>();

    const loadAllCards = async () => {

        setLoading(true)

        getCards().then(res => {

            const rawCards = Object.values(res);
            const cards = rawCards.reduce((total, currentValue) => [...total, ...currentValue], [])
            setAllCards(cards)
            setLoading(false)

        }).catch(err => setLoading(false))

    };

    const loadSearchCards = async (query: string) => {

        setLoading(true)

        getSearchCards(query).then(res => {

            setSearchCards(res)
            setLoading(false)

        }).catch(err => setLoading(false))

    };

    React.useEffect(() => {
        loadAllCards();
    }, []);

    const onPress = (card: ICard) => {

        const { navigation, setCard } = props
        setCard(card)
        navigation.navigate('Detail')
    }

    const renderItem = (card: ICard): JSX.Element => (
        <TouchableOpacity
            style={styles.text}
            onPress={() => onPress(card)}>
            <Text>{card.name}</Text>
        </TouchableOpacity>
    );

    if (!allCards) return <ActivityIndicator />

    return (
        <View style={styles.container}>
            <View>
                <TextInput
                    onChangeText={(text) => {
                        loadSearchCards(text)
                        setSearchText(text)
                    }}
                    style={styles.input}
                    placeholder="🔍 Search"
                />
            </View>
            <FlatList
                data={searchText?.trim() ? searchCards : allCards}
                keyExtractor={(_, i) => 'card-' + i}
                renderItem={({ item }) => renderItem(item)}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => <View style={styles.seperator} />}
                refreshing={loading}
                onRefresh={loadAllCards}
            />
        </View>
    );
};


const mapDispatchToProps = {
    setCard,
};
export default connect(undefined, mapDispatchToProps)(Cards);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff'
    },
    text: {
        padding: 10,
        backgroundColor: '#fff',

    },
    listContent: {
        padding: 5,
    },
    listHeader: {
        alignSelf: 'center',
        marginVertical: 10,
    },
    seperator: {
        height: 1,
        backgroundColor: '#ddd'
    },
    input: {
        padding: 10,
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 3,
    },
});