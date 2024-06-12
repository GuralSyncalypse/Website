var containers = document.querySelectorAll('.item-container');
let indexes = new Array(containers.length).fill(0);

function load(container, index, offset)
{
    fetch(`contents/container-${index + 1}/data.json`)
    .then(response => response.json())
    .then(data => {
        if (offset < 0) {
            offset = (data.length) + (offset % data.length);   
            indexes[index] = offset;
        }
        if (data.length == 4)
            offset = 0; // Nếu chỉ có 4 sản phẩm, thì không xê dịch.
        const items = container.querySelectorAll('.item');
        items.forEach(function(item, itemIndex) {
            const img = item.querySelector('img');
            const info = item.querySelector('.item-info');
            
            const dataIndex = (itemIndex + offset) % data.length;
            const title = data[dataIndex].title; // Not used.
            const price = data[dataIndex].price;
            const imgSource = data[dataIndex].imgSource;

            img.src = imgSource;
            const span = info.querySelector('span');
            span.textContent = price;
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

// Các events.
for (let i = 1; i <= containers.length; i++) {
    document.getElementById(`left-${i}`).addEventListener('click', function() {
        updateIndexes(i, -1);
    });

    document.getElementById(`right-${i}`).addEventListener('click', function() {
        updateIndexes(i, 1);
    });
}

function updateIndexes(index, change) {
    indexes[index - 1] += change;
    load(containers[index - 1], index - 1, indexes[index - 1]);
}

// Tải contents.
document.addEventListener('DOMContentLoaded', function() {
    containers.forEach(function(container, index) {
        console.log(container);
        load(container, index, 0);
    });
});
