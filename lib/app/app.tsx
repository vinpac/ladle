import React, { Suspense } from "react";
import queryString from "query-string";
//@ts-ignore
import { stories } from "./generated-list";
import Navigation from "./navigation";
import history from "./history";
import ErrorBoundary from "./error-boundary";

// const emitter = new Emittery();
// const STORY_IMPORTED = "story-imported";
//emitter.emit(STORY_IMPORTED, module.Middle.title);

const getQueryStory = (locationSearch: string) =>
  queryString.parse(locationSearch).story as string;

const App: React.FC = () => {
  //const [dato, setData] = React.useState("empty");
  // React.useEffect(() => {
  //   emitter.on(STORY_IMPORTED, setData);
  //   return () => {
  //     emitter.off(STORY_IMPORTED, setData);
  //   };
  // });
  const firstStory = Object.keys(stories)[0];
  const [activeStory, setActiveStory] = React.useState(
    getQueryStory(location.search)
  );

  React.useEffect(() => {
    if (!activeStory && !getQueryStory(location.search)) {
      history.push(`?story=${firstStory}`);
      setActiveStory(firstStory);
    }
  }, []);

  React.useEffect(() => {
    const unlisten = history.listen(({ location }) => {
      setActiveStory(getQueryStory(location.search));
    });
    return () => {
      unlisten();
    };
  }, []);

  return (
    <div>
      <Navigation stories={Object.keys(stories)} />
      <hr />
      {activeStory && (
        <ErrorBoundary>
          <Suspense fallback={null}>
            {stories[activeStory] ? (
              React.createElement(stories[activeStory].component)
            ) : (
              <h1>No story found.</h1>
            )}
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  );
};

export default App;