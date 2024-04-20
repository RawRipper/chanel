document.addEventListener('DOMContentLoaded', function () {
    const videoPlayer = videojs('my-video');
    const channelName = document.getElementById('channelName');
    const channelItems = document.getElementById('channelItems');

    // Função para carregar os canais do JSON
    function loadChannels() {
        fetch('channels.json')
            .then(response => response.json())
            .then(data => {
                data.channels.forEach((channel, index) => {
                    const listItem = document.createElement('li');
                    const logoImg = document.createElement('img');
                    logoImg.src = channel.logo;
                    logoImg.alt = channel.name;
                    listItem.appendChild(logoImg);

                    const channelLink = document.createElement('a');
                    channelLink.textContent = `${index + 1}. ${channel.name}`;
                    channelLink.href = '#';
                    channelLink.addEventListener('click', () => {
                        loadVideo(channel, listItem);
                    });
                    listItem.appendChild(channelLink);

                    channelItems.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar canais:', error);
            });
    }

    // Função para carregar o vídeo do canal selecionado
    function loadVideo(channel, selectedListItem) {
        channelName.textContent = `${channel.name} (Canal ${channel.id})`;

        // Remover classe 'selected' de todos os itens da lista
        const listItems = document.querySelectorAll('#channelItems li');
        listItems.forEach(item => {
            item.classList.remove('selected');
        });

        // Adicionar classe 'selected' ao item selecionado
        selectedListItem.classList.add('selected');

        const videoSource = document.createElement('source');
        videoSource.src = channel.m3u8;
        videoSource.type = 'application/x-mpegURL';
        videoPlayer.src(videoSource.src);
        videoPlayer.load();
        videoPlayer.play();
    }

    // Iniciar carregamento dos canais ao carregar a página
    loadChannels();
});
