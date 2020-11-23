const userList = document.querySelector('[data-role=user-list]');

const items = new Set();

function buildDOM() {
    const fragment = document.createDocumentFragment();

    userList.innerHTML = '';

    for (const name of items) {
        const element = document.createElement('div');
        element.classList.add('user-list-item');
        element.textContent = name;
        fragment.append(element);
    }

    userList.append(fragment);
}

function add(name) {
    items.add(name);
    buildDOM();
}

function remove(name) {
    items.delete(name);
    buildDOM();
}


module.exports = {
    add,
    remove
}