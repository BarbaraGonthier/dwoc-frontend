import React, { useEffect } from 'react';
import ProjCard from './ProjMinCard/ProjMinCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { makeStyles } from '@material-ui/core/styles';
import RingLoader from 'react-spinners/RingLoader';
import { QueryRenderer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import WebFont from 'webfontloader';
import { css } from '@emotion/core';
import { header1 } from '../../DwocStyles';

const environment = require('../../Environment').environment;

const useStyles = makeStyles(theme => ({
  container: {
    minWidth: '93%',
    paddingLeft: '2%'
  },
  header1: header1
}));

WebFont.load({
  google: {
    families: [header1.fontFamily]
  }
});

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function Projects(props) {
  const classes = useStyles();
  const orgName = props.match.params.orgName;
  const defaultTools = ['C++', 'Python'];
  const isLogged = props.isLogged;
  const orgID = props.match.params.id;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.container}>
      <QueryRenderer
        environment={environment}
        query={graphql`
          query ProjCardsQuery($orgid: ProjectWhereInput) {
            projects(where: $orgid) {
              id
              projName
              projSlug
              projDesc
              githubUrl
              organization {
                id
              }
            }
          }
        `}
        variables={{ orgid: { organization: { id: orgID } } }}
        render={({ error, props }) => {
          if (error) {
            console.log(`${error} <= error Relay ProjCards`);
            return <div>Error!</div>;
          }
          if (!props) {
            return (
              <div>
                <br />
                <h2
                  //style={{ textAlign: 'center' }}
                  className={classes.header1}
                >
                  Projects under {orgName}
                </h2>
                <div style={{ paddingTop: '20%' }}>
                  <RingLoader css={override} color={'#5CDB95'} />
                </div>
              </div>
            );
          }
          // console.log(`${JSON.stringify(props)} <= props in ProjCards  `);

          let n = props.projects.length;
          const allProjects = props.projects;
          let structuredProjects = [];

          for (let i = 0; i < n; i += 4) {
            let row = [];
            for (let j = i; j < i + 4; j++) {
              if (j >= n) break;
              row.push(allProjects[j]);
            }
            while (row.length < 4) row.push([]);
            structuredProjects.push(row);
          }
          let num = 1;

          return (
            <div>
              <br />
              <h2
                //style={{ textAlign: 'center' }}
                className={classes.header1}
              >
                Projects under {orgName}
              </h2>
              {structuredProjects.map(proj => (
                <Row key={num++}>
                  {proj.map(o =>
                    o.id ? (
                      <Col key={num++}>
                        <ProjCard
                          tools={defaultTools}
                          projName={o.projName}
                          orgName={orgName}
                          projDesc={o.projDesc}
                          {...o}
                          isLogged={isLogged}
                        />
                      </Col>
                    ) : (
                      <Col key={num++}></Col>
                    )
                  )}{' '}
                </Row>
              ))}
            </div>
          );
        }}
      />
    </div>
  );
}
