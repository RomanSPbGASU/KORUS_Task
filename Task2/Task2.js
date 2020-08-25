fetch("https://jsonplaceholder.typicode.com/comments")
    .then(response => response.json()).then(json_example => {

    var current_page = 1;
    var records_per_page = 10;
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var listing_table = document.getElementById("listingTable");
    var page_span = document.getElementById("page");


    var num_pages = Math.ceil(json_example.length / records_per_page)

    btn_next.onclick = nextPage;
    btn_prev.onclick = prevPage;

    changePage(1);

    function showPage(pageNumber) {
        var oldTable = document.getElementById('listingTable'),
            newTable = oldTable.cloneNode();

        oldTable.parentNode.replaceChild(newTable, oldTable);

        // head rendering
        var thead = document.createElement('thead');
        var tr = document.createElement('tr');
        Object.keys(json_example[0]).forEach(cell => {
            var th = document.createElement('th')
            th.appendChild(document.createTextNode(formatHeader(cell)))
            tr.appendChild(th);
        });
        thead.appendChild(tr);
        newTable.appendChild(thead);

        // body rendering
        var tbody = document.createElement('tbody');
        for (var i = (current_page - 1) * records_per_page; i < current_page * records_per_page; i++) {
            tr = document.createElement('tr');

            for (var j = 0; j < Object.keys(json_example[i]).length; j++) {
                var td = document.createElement('td');
                td.appendChild(document.createTextNode(Object.values(json_example[i])[j]));
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        newTable.appendChild(tbody);

        page_span.innerHTML = pageNumber + '/' + num_pages;
    }

    function prevPage() {
        if (current_page > 1) {
            current_page--;
            changePage(current_page);
        }
    }

    function nextPage() {
        if (current_page < num_pages) {
            current_page++;
            changePage(current_page);
        }
    }

    function changePage(page) {
        showPage(page)
        switch (page) {
            case 1:
                btn_prev.style.visibility = "hidden";
                break;
            case num_pages:
                btn_next.style.visibility = "hidden";
                break;
            default:
                btn_prev.style.visibility = "visible";
                btn_next.style.visibility = "visible";
        }
    }
});

function formatHeader(name) {
    var formattedName = '';
    for (let l of name) {
        if (l === l.toUpperCase())
            formattedName += ' ' + l;
        else
            formattedName += l.toUpperCase();
    }
    return formattedName.trim();
}


