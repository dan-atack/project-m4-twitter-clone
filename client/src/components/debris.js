            <ButtonPanel>
                <PanelButton>
                    <Icon icon={messageCircle}/>
                </PanelButton>
                <div className="retweets">
                    <PanelButton onMouseUp={handleRetweet}>
                        <Icon icon={repeat}/>
                    </PanelButton>
                    <span style={{marginLeft: 8}}>{numRetweets}</span>
                </div>
                <div className="likes">
                    <PanelButton onMouseUp={handleLike}>
                        <Icon icon={heart}/>
                    </PanelButton>
                    <span style={{marginLeft: 8}}>{numLikes}</span>
                </div>
                <PanelButton>
                    <Icon icon={upload}/>
                </PanelButton>
            </ButtonPanel>