module.exports = function(items) {
    items.sort(function(a, b) {
        return ('' + a.games).localeCompare(b.games);
    });

    function groupBy( array , f )
    {
        let groups = {};
        array.forEach( function( o )
        {
            let group = f(o);
            groups[group] = groups[group] || [];
            groups[group].push( o );
        });
        return Object.keys(groups).map( function( group )
        {
            groups[group].game_name = group;
            return groups[group];
        })
    }

    return groupBy(items, function(item)
    {
        return item.games.trim();
    });
};