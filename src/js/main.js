function getTemplate (name, message) {
    let templateList = {
        select : `
            <select>
                <option value="-1" selected>select month</option>
                <option value="0">Jan</option>
                <option value="1">Feb</option>
                <option value="2">Mar</option>
                <option value="3">Apr</option>
                <option value="4">May</option>
                <option value="5">Jun</option>
                <option value="6">Jul</option>
                <option value="7">Aug</option>
                <option value="8">Sept</option>
                <option value="9">Oct</option>
                <option value="10">Nov</option>
                <option value="11">Dec</option>
            </select>`,
        clear: `<div>${message}</div>`,
        label: `<label>${message}</label>`,
    };

    if (templateList.hasOwnProperty(name)) {
        return templateList[name]
    } else {
        console.error(`template ${name} does not exist`);
    }
}

let select = $(getTemplate('select')),
    label = $(getTemplate('label', 'month of birth')),
    clearBtn = $(getTemplate('clear', '\u274C'));

    label.append(select);

$(document).ready(function() {
    let table = $('#table');

    table.dataTable({
        ajax: {
            url: "json.txt",
            dataSrc: ''
        },
        columns: [
            { data: "firstname", title: 'firstname' },
            { data: "lastname", title: "lastname" },
            { data: "email", title: "email" },
            { data: "phonenumber", title: "phonenumber" },
            { data: "birthday_contact", title: "birthday_contact" },
            { data: "company", title: "company" }
        ],
        paging: false,
        dom: '<"wrapper" <tri>>',
        initComplete: function() {

            /* Custom filtering function */
            $.fn.dataTable.ext.search.push(
                function( settings, data, dataIndex ) {
                    let value = parseInt( $(select).val(), 10 ),
                        month = new Date(data[4]).getMonth();

                    return (value === -1 || value === month);
                }
            );

        }
    });
    $('<div></div>')
        .addClass('searching')
        .append(label)
        .append(clearBtn)
        .insertBefore(table);

    select.on('change', function() {
        table.api().order(4, 'desc').draw();
    });
    clearBtn.on('click', function() {
        $(select).prop("selectedIndex", 0).change();
    });
});
