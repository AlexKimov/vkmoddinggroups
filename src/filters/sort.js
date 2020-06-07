module.exports = function(items) {
    items.sort(function(a, b) {
        return ('' + a.name).localeCompare(b.name);
    });

    function isLetter(c) {
        return c.toLowerCase() != c.toUpperCase();
    }

    function groupBy( array , f )
    {
        let groups = {};
        array.forEach( function( o )
        {
            let group = f(o)[0];
            if (group !== undefined) {
                if (!isLetter(group))
                    group = '-';
                groups[group] = groups[group] || [];
                groups[group].push(o);
            }
        });

        return Object.keys(groups).map( function( group )
        {
            groups[group].letter = group;
            return groups[group];
        })
    }

    return groupBy(items, function(item)
    {
        return item.name.trim().toUpperCase();
    });
};