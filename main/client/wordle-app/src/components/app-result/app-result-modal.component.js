import React, { useState, useEffect } from "react";
import "./app-result-modal.component.css";
import { Modal, Button } from "react-bootstrap";
import HorizontalGraphComponent from "../app-graph/horizontal-graph/horizontalGraph.component";
import CustomToastComponent from "../app-toast/toast.component";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
} from "react-share";
const AppResultModalComponent = (props) => {
  const [show, setShow] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [showCopyToast, setShowCopyToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [resultText, setResultText] = useState("");

  let data = [];

  let currentStoredGameStat = window.localStorage.getItem("gameStat");
  let parsedCurrentStoreGameStat = JSON.parse(currentStoredGameStat);
  if (parsedCurrentStoreGameStat && parsedCurrentStoreGameStat.length > 0) {
    let arr = [];
    parsedCurrentStoreGameStat.forEach((play) => {
      let temp_arr = [];
      for (let i = 0; i < 6; i++) {
        if (i < play.length) {
          if (play[i] === "win") {
            temp_arr.push(1);
          } else {
            temp_arr.push(0);
          }
        } else {
          temp_arr.push(0);
        }
      }
      arr.push(temp_arr);
    });

    data = arr;
  }
  console.log("data is", props);
  const mappedCopyText =
    props.result && props.result.boardStat
      ? props.result.boardStat.map((row) => {
          return row.map((col, index) => {
            return (
              <div key={index} className="copy-column">
                {col.status === "misplaced" ? "🟧" : null}
                {col.status === "incorrect" ? "⬛" : null}
                {col.status === "correct" ? "🟩" : null}
              </div>
            );
          });
        })
      : [];

  console.log("mapped copy text ", mappedCopyText);

  const handleClose = () => {
    setShow(false);
    props.OnCloseResultModal();
  };

  const prepareCopyText = () => {
    const copyTextArray = props.result.boardStat
      .map((row) => {
        return row
          .map((col) => {
            switch (col.status) {
              case "misplaced":
                return "🟧";
              case "incorrect":
                return "⬛";
              case "correct":
                return "🟩";
            }
          })
          .filter((checkCol) => checkCol !== undefined);
      })
      .filter((checkRow) => checkRow.length > 0);

    const text = copyTextArray.map((row) => row.join(" ")).join("\n");
    return text;
  };

  const copyToClipBoard = (from = "other") => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const copyText = prepareCopyText();
          navigator.clipboard.writeText(copyText);
          setToastMessage("Copied successfully");
          setResultText(copyText);
          resolve("Copied Successfully");
        } catch (e) {
          setToastMessage("Something went wrong!");
          reject("Something went wrong");
        }

        if (from === "copy") {
          openToast();
          openCopyToast();
        }
      }, 300);
    });
  };

  const openToast = () => {
    setShowToast(true);
  };
  const closeToast = () => {
    setShowToast(false);
  };

  const openCopyToast = () => {
    setShowCopyToast(true);
  };
  const closeCopyToast = () => {
    setShowCopyToast(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="body">
          {props.result.imgUrl ? (
            <div className="image">
              <img src={props.result.imgUrl} width="180px" height="100px" />
            </div>
          ) : null}

          {/* <div className="stat">
					
						<h5 style={{ textAlign: "center" }}>GUESS DISTRIBUTION</h5>
						<div style={{ textAlign: "center" }}>
							<HorizontalGraphComponent dataset={data} />
						</div>
					</div> */}

          <div className="copy-board">
            <h5 style={{ textAlign: "center" }}>RESULT </h5>
            <div className="result-body">
              {mappedCopyText.map((row, index) => {
                return (
                  <div key={index} className="copy-row">
                    {" "}
                    {row}{" "}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="modal-footer-body">
          <div>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </div>
          <div class="social-share">
            {/* <div style={{marginTop  : "4px"}}>
							Share in :
						</div> */}
            <div>
              <FacebookShareButton
                url="https://github.com/rezavai92/wordle-fullstack"
                quote={
                  "[The result is copied to your clip board, just paste here]"
                }
                hashtag="Wordle-Reza"
                beforeOnClick={copyToClipBoard}
              >
                <FacebookIcon size={32} round={32} />
              </FacebookShareButton>
            </div>

            <div>
              <WhatsappShareButton
                url="https://github.com/rezavai92/wordle-fullstack"
                quote={
                  "[The result is copied to your clip board, just paste here]"
                }
              >
                <WhatsappIcon size={32} round={32} />
              </WhatsappShareButton>
            </div>

            <div>
              <LinkedinShareButton
                url="https://github.com/rezavai92/wordle-fullstack"
                quote={
                  "[The result is copied to your clip board, just paste here]"
                }
              >
                <LinkedinIcon size={32} round={32} />
              </LinkedinShareButton>
            </div>

            <div>
              <TwitterShareButton
                url="https://github.com/rezavai92/wordle-fullstack"
                quote={
                  "[The result is copied to your clip board, just paste here]"
                }
              >
                <TwitterIcon size={32} round={32} />
              </TwitterShareButton>
            </div>
            <div>
              <Button
                variant="primary"
                onClick={() => {
                  copyToClipBoard("copy");
                }}
              >
                Copy
              </Button>
            </div>
          </div>
        </div>
      </Modal.Footer>
      {/* 
			{showCopyToast && (
				<CustomToastComponent
					background="white"
					toastPosition="middle-center"
					toastMessage={mappedCopyText.map((row, index) => {
						return (
							<div key={index} className="copy-row">
								{" "}
								{row}{" "}
							</div>
						);
					})}
					onCloseToast={() => {
						closeCopyToast();
					}}
				/>
			)} */}

      {showToast && (
        <CustomToastComponent
          background="green"
          color="white"
          toastMessage={toastMessage}
          toastPosition="top-center"
          onCloseToast={() => {
            closeToast();
          }}
        />
      )}
    </Modal>
  );
};

export default AppResultModalComponent;
